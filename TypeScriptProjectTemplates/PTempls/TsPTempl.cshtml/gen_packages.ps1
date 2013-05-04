$items = Get-ChildItem .\packages\*.nupkg -Recurse | Resolve-Path -Relative

foreach($item in $items)
{
	$itemName = $item.Name
	Write-Output "<Content Include=""ProjectTemplates\TypeScriptMVCProjectTemplate.cshtml\$item"">"
	Write-Output "  <CopyToOutputDirectory>Always</CopyToOutputDirectory>"
	Write-Output "  <IncludeInVSIX>true</IncludeInVSIX>"
    Write-Output "</Content>"
}
