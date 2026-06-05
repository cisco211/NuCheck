// Copy source
async function copySource()
{
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	const results = await chrome.scripting.executeScript({
		target:
		{
			tabId: tab.id
		},
		func: () =>
		{
			const html = document.documentElement.outerHTML;
			return html.startsWith('<!DOCTYPE') ? html : '<!DOCTYPE html>\n' + html;
		}
	});
	const html = results[0].result;
	await navigator.clipboard.writeText(html);
	return html;
}

// Open validator
function openValidator()
{
	chrome.tabs.create({ url: "https://validator.w3.org/nu/#textarea" });
	window.close();
}

// Document ready
document.addEventListener('DOMContentLoaded', () =>
{

	// Copy button
	document.getElementById('btnCopy').addEventListener('click', async () =>
	{
		await copySource();
	});

	// Validate button
	document.getElementById('btnValidate').addEventListener('click', () =>
	{
		openValidator();
	});

	// Full button (copy + validate)
	document.getElementById('btnFull').addEventListener('click', async () =>
	{
		await copySource();
		openValidator();
	});
});
