$items = Get-ChildItem .\*.* -Include *.js,*.ts,*.map

foreach($item in $items)
{
	$itemName = $item.Name
	Write-Output "<Asset Type=""Microsoft.VisualStudio.Mvc.Templates"" d:Source=""File"" Path=""ProjectTemplates\TypeScriptMVCProjectTemplate.cshtml\Scripts\$itemName"" />"
}