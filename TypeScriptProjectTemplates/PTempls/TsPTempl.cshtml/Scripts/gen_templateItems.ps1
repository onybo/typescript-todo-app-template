
Write-Output "<Folder Name=""application"" TargetFolderName=""application"">"
$items = Get-ChildItem .\app\*.* -Include *.js,*.ts,*.map
foreach($item in $items)
{
	$itemName = $item.Name
	Write-Output "<ProjectItem TargetFileName=""$itemName"">$itemName</ProjectItem>"
}
Write-Output "</Folder>"

$items = Get-ChildItem .\*.* -Include *.js,*.ts,*.map
foreach($item in $items)
{
	$itemName = $item.Name
	Write-Output "<ProjectItem TargetFileName=""$itemName"">$itemName</ProjectItem>"
}
