$items = Get-ChildItem .\*.* -Recurse 

foreach($item in $items)
{
	$itemName = $item.Name
	Write-Output "<ProjectItem ReplaceParameters=""true"" TargetFileName=""$itemName"">$itemName</ProjectItem>"
}