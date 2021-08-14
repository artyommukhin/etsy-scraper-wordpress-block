import { apiKey } from '../config.json'


/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { TextControl, Button } from '@wordpress/components';

import { useState } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {

	const [listingUrl, setListingUrl] = useState('');
	const [] = useState('yellow');

	const loadListing = async ( url ) => {
		
		// TODO: validate url
		//let re = /(?:https:\/\/)?(?:www\.)?etsy\.com\/listing\/\d+/
		const urlSplit = url.split("/");
		const listingId = +urlSplit[urlSplit.indexOf("listing")+1];

		// compose API query string
		const etsyQueryString = `https://openapi.etsy.com/v2/listings/${listingId}?api_key=${apiKey}`;

		// get listing data
		const etsyResponse = await fetch(etsyQueryString, {mode: 'no-cors'});
		if (etsyResponse.ok) {
			const data = await etsyResponse.json();
			alert(data.results[0].title);
		}
		else alert("error: " + etsyResponse.statusText);

		// get listing image(s)

	} 

	return (
		<div { ...useBlockProps() } >
			
			<TextControl 
				label = { __( 'Listing URL', 'etsy-scraper' ) }
				value = { listingUrl } 
				onChange = { (value) => setListingUrl(value) }
				color = 'yellow'
			/>
			<Button 
				isPrimary = { true }
				onClick = { () => loadListing(listingUrl) }
			> Load listing data
			</Button>
		</div>
	);
}
