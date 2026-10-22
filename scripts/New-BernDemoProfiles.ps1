<#
  Contas temporarias para testar os tres paineis. Nao cria compras nem pagamentos.
  Requer segredo ADMIN_KEY no Worker; solicita chave localmente se necessario.
#>
param(
  [Parameter(Mandatory=$true)][string]$BaseUrl
)
$ErrorActionPreference='Stop'
$temporaryKey=$false
if (-not $env:BERN_ADMIN_KEY) {
  $secret=Read-Host 'Cole o valor de ADMIN_KEY (a entrada fica oculta)' -AsSecureString
  $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
  try { $env:BERN_ADMIN_KEY=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr) }
  finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr) }
  $temporaryKey=$true
}
if (-not $env:BERN_ADMIN_KEY) { throw 'ADMIN_KEY nao informada' }
if ($BaseUrl -notmatch '^https://[^/]+') { throw 'Informe uma URL HTTPS do Worker, por exemplo https://seu-worker.workers.dev' }
$BaseUrl=$BaseUrl.TrimEnd('/')
$headers=@{'X-Admin-Key'=$env:BERN_ADMIN_KEY}
$suffix=(Get-Date).ToUniversalTime().ToString('yyyyMMddHHmmss')+'-'+(Get-Random -Minimum 100 -Maximum 999)
$profiles=@(
  @{role='candidate';name='Candidato Demonstracao'; email="candidato-$suffix@bern.invalid"},
  @{role='lawyer';name='Advogado Demonstracao';email="advogado-$suffix@bern.invalid"},
  @{role='company';name='Empresa Demonstracao';email="empresa-$suffix@bern.invalid"}
)
Write-Host "`n=== BERN GLOBAL | CONTAS DEMONSTRACAO (24 HORAS) ===" -ForegroundColor Cyan
try {
foreach($profile in $profiles) {
  $bytes=New-Object byte[] 24
  $rng=[System.Security.Cryptography.RandomNumberGenerator]::Create()
  try{$rng.GetBytes($bytes)}finally{$rng.Dispose()}
  $password=([Convert]::ToBase64String($bytes).TrimEnd('=') -replace '\+','-' -replace '/','_')
  $registration=@{name=$profile.name;email=$profile.email;role=$profile.role;password=$password}|ConvertTo-Json -Compress
  $created=Invoke-RestMethod -Uri "$BaseUrl/api/admin/provision" -Method POST -ContentType 'application/json' -Headers $headers -Body $registration
  $request=@{email=$profile.email;purpose='visual-testing'}|ConvertTo-Json -Compress
  $grant=Invoke-RestMethod -Uri "$BaseUrl/api/admin/demo-access" -Method POST -ContentType 'application/json' -Headers $headers -Body $request
  Write-Host "`nPerfil: $($profile.role)" -ForegroundColor Green
  Write-Host "Email: $($created.email)"
  Write-Host "Senha provisoria: $password" -ForegroundColor Yellow
  Write-Host 'Acesso demonstracao: 24h. Primeiro login exige troca da senha.'
}
Write-Host "`nAbra $BaseUrl e use o botao Entrar para testar cada perfil. Encerre uma sessao antes de abrir a proxima." -ForegroundColor Cyan
Write-Host 'Guarde as senhas em local seguro, sem publicar prints. As contas de teste usam emails invalidos e NAO recebem mensagens.'

} finally { if ($temporaryKey) { Remove-Item Env:BERN_ADMIN_KEY -ErrorAction SilentlyContinue } }
