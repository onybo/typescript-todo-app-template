$items = Get-ChildItem .\*.* -Recurse | Resolve-Path -Relative

foreach($item in $items)
{
	#$itemName = $item.
	Write-Output "<Asset Type=""Microsoft.VisualStudio.Mvc.Templates"" d:Source=""File"" Path=""$item"" />"
}