# Hide YouTube Statistics

As a content creator, looking at video analytics when browsing YouTube to chill can quickly become a stressful activity, as you're always exposed to other people's view numbers, like numbers, comment numbers and more. This is great when looking for inspiration, but not so nice when all you want to do is watch some videos and have a good time!

To solve such woes, I created this extension with one goal in mind: **allowing you, a content creator, to enjoy YouTube like us viewers do.**

## What does it do?

- Hide view numbers on videos, shorts and YouTube Studio.
- Hide like numbers on videos, shorts, comments and YouTube studio.
- Hide comment numbers on videos, shorts and YouTube studio.
- Hide analytics in YouTube studio, such as latest video performance, latest comment performance, latest comments, recent activity, and more.
- Hide the real subscriber count in YouTube Studio by rounding it up (1K, 100K, 1M, 1.1M, etc).
- Hide comments on videos and shorts.

## How does it do that?

This extension works in two ways:

- For simple rules, such as removing views, likes and other easy tasks, CSS is used, which can be found in `content.css`.
- For complex rules, such as changing labels, numbers and behavior, JavaScript is used, which can be found in `contentScript.css`.

Customization is available through the popup, defined in `popup.html`, `popup.js` and `popup.css`.

## How do I keep this up to date?

If I, the original author, ever am to stop updating this, all you have to do is inspect the YouTube pages you are interested in and locate areas of concern. For example, by hiding the `.subscribers-trend` element, the subscriber trend in YouTube Studio can be hidden.

This is documented in the code and stylesheets, so updating the extension should not be difficult. However, beware that even Chromium browsers can behave differently when dealing with `MutationObserver`, something I learned the hard way.