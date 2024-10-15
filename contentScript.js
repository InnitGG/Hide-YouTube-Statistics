/**
 * Returns the subscriber count in a more readable,
 * less precise format.
 */
function formatSubscriberCount(subscriberCount) {
    if (subscriberCount >= 1000000) { // For millions
        const millions = subscriberCount / 1000000;
        const roundedMillions = Math.round(millions * 10) / 10; // Rounds to 1 decimal place
        return `${roundedMillions}M`;
    } else if (subscriberCount >= 100000) { // For hundred thousands
        const hundredThousands = Math.round(subscriberCount / 100000) * 100000;
        return (hundredThousands / 1000) + 'K';
    } else if (subscriberCount >= 1000) { // For thousands
        const thousands = Math.round(subscriberCount / 1000) * 1000;
        return (thousands / 1000) + 'K';
    }
    return subscriberCount.toString(); // For less than 1000, show the exact number
}

/**
 * Sets the visibility of comments on the page.
 */
function setCommentVisibility(hideComments) {
    const comments = document.querySelectorAll('ytd-comments[id="comments"]');
    comments.forEach(comment => {
        comment.style.display = hideComments ? 'none' : 'block';
    });
}


/**
 * Returns whether an element has a parent matching a selector,
 * up to a certain depth.
 */
function hasParentMatchingSelector(element, selector, depth) {
    let parent = element;
    for (let i = 0; i < depth; i++) {
        parent = parent.parentElement;
        if (!parent) {
            return false;
        }

        if (parent.matches(selector)) {
            return true;
        }
    }

    return false;
}

const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        // Remove the comment amounts in the video comment section.
        if (mutation.target.matches("ytd-button-renderer#more-replies")) {
            const buttonLabel = mutation.target.querySelector('.yt-core-attributed-string');

            if (buttonLabel) {
                buttonLabel.textContent = 'Show more';
            }
        }

        // Remove the comment amounts in the video comment section.
        if (mutation.target.matches("ytd-button-renderer#less-replies")) {
            const buttonLabel = mutation.target.querySelector('.yt-core-attributed-string');

            if (buttonLabel) {
                buttonLabel.textContent = 'Show less';
            }
        }

        // [Studio] Remove the 'Views' subtitle in the 'Top videos' section.
        // Annoyingly, this cannot be done reactively. We must check for the title
        // from a stable parent as I cannot trace where the subtitle is added.
        const channelDashboardFactsCard = document.querySelector('ytcd-card[test-id="channel-dashboard-facts-card"]');

        // To do that, we locate the nearest stable parent - the card itself - and
        // then use a query selector to locate the title.
        if (channelDashboardFactsCard) {
            const topVideosTitle = [
                ...channelDashboardFactsCard.querySelectorAll('div.section-title span.section-title-text')
            ].find(span => span.textContent.trim() === "Top videos");

            if (topVideosTitle) {
                // Now that we have the title, we can find the subtitle.
                // As a reminder, the structure looks like this:

                // => Top videos
                // => Last 48 hours - Views

                // We are trying to remove 'Views'.
                const topVideosSubtitle = topVideosTitle.nextElementSibling;
                if (topVideosSubtitle) {
                    // Now that we have the subtitle, we can find the span for the 'Last 48 hours' 'span'.
                    const lastHours = topVideosSubtitle.querySelector('span');
                    if (lastHours) {
                        // And then, find the 'Views' section, which is raw text.
                        const views = lastHours.nextSibling;
                        if (views) {
                            views.remove();
                        }
                    }
                }
            }
        }

        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.matches('ytd-comments[id="comments"]') || node.matches('ytd-comment-renderer')) {
                    chrome.storage.sync.get('hideComments', function(data) {
                        if (data.hideComments !== undefined) {
                            setCommentVisibility(data.hideComments);
                        }
                    });
                }

                // [Studio] Remove the 'performance' word from the 'Latest video performance'
                // section.
                if (node.matches("#video-snapshot")) {
                    const title = node.querySelector(".title");
                    if (title) {
                        title.textContent = title.textContent.replace(" performance", "");
                    }
                }

                // [Studio] Remove the analytics bar below the video thumbnail in the
                // 'Latest video performance' section.
                if (node.matches("div .collapsable-bar")) {
                    node.remove();
                }


                // [Studio] Remove the comment amounts in the 'Latest video performance'
                // section.
                if (node.matches("div .label")) {
                    if (hasParentMatchingSelector(node, '#view-comments-button', 2)) {
                        node.textContent = 'See Comments';
                    }
                }

                // [Studio] Remove the reply amount in the 'Comments' section.
                if (node.matches("ytcp-comment-toggle-button#show-replies-button")) {
                    const text = node.querySelector("yt-formatted-string#text");

                    if (text) {
                        text.textContent = "Replies";
                    }
                }

                // [Studio] Remove the views amount in the 'Comments' section 'Mentions' section.
                if (node.matches("ytcp-mention-entry")) {
                    const contextMetadata = node.querySelector("div#context-metadata");

                    if (contextMetadata) {
                        const nodes = Array.from(contextMetadata.childNodes);

                        if (nodes.length > 3) {
                            if (nodes[2].nodeType == Node.ELEMENT_NODE) {
                                nodes[2].style.display = 'none';
                            }

                            if (nodes[3].nodeType == Node.TEXT_NODE) {
                                nodes[3].textContent = '';
                            }
                        }
                    }
                }

                // [Studio] Round the subscriber amount in the 'Channel analytics' section,
                // and the video views in the 'Top videos' subsection.
                // Also removes the performance metrics icons.
                if (node.matches('div .ytcd-channel-facts-item')) {
                    const metricValue = node.querySelector(".metric-value-big.style-scope.ytcd-channel-facts-item");
                    if (metricValue) {
                        const subscribersTitle = metricValue.parentElement.querySelector(".subscribers-title.style-scope.ytcd-channel-facts-item");
                        if (subscribersTitle && subscribersTitle.textContent.includes("Current subscribers")) {
                            const rawCount = parseInt(metricValue.textContent.replace(/,/g, ''));
                            metricValue.textContent = formatSubscriberCount(rawCount);
                        }
                    }

                    const topVideoViewLabels = node.querySelectorAll('a.table-cell.remove-default-style.style-scope.ytcd-channel-facts-item[tabindex="-1"]');
                    topVideoViewLabels.forEach(topVideoViewLabel => {
                        topVideoViewLabel.text = "⠀⠀⠀⠀";
                    });
                }

                // [Video] Remove the comment amounts in the video comment section.
                if (node.matches("ytd-button-renderer#more-replies")) {
                    const buttonLabel = node.querySelector('.yt-core-attributed-string');

                    if (buttonLabel) {
                        buttonLabel.textContent = 'Show more';
                    }
                }

                // [Video] Remove the comment amounts in the video comment section.
                if (node.matches("ytd-button-renderer#less-replies")) {
                    const buttonLabel = node.querySelector('.yt-core-attributed-string');

                    if (buttonLabel) {
                        buttonLabel.textContent = 'Show less';
                    }
                }

                // [Video] Remove the comment amount in the video comment section.
                if (node.matches("ytd-comments-header-renderer")) {
                    // We must select the renderer here, because the amount is added after the renderer is added.
                    // It appears to be updated by the renderer and targeting the count directly, when #sections
                    // is added, for example, does not work.
                    const count = node.querySelector("#count");

                    if (count) {
                        // The labels are contained in 'span' elements.
                        // These 'span' elements are dynamically rendered, which means the nearest stable parent
                        // is the renderer itself. We must wait for it to be added to then verify the children.

                        // I do not understand why, as explained above.

                        // Starting at the stable parent, the chain goes:
                        // 'ytd-comments-header-renderer'
                        // => 'div#title'
                        // => 'div#leading-section'
                        // => 'h2#count'
                        // => 'yt-formatted-string'
                        // => 'span:nth-child(1)' & 'span:nth-child(2)'
                        const number = count.querySelector("span:nth-child(1)");
                        const label = count.querySelector("span:nth-child(2)");

                        if (number) {
                            number.textContent = '';
                        }

                        if (label) {
                            // We must remove the space in front of the label, as it is there
                            // after the amount is removed; therefore it looks weird.
                            label.textContent.trimStart();
                        }
                    }
                }
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideComments !== undefined) {
        setCommentVisibility(request.hideComments); // This function toggles visibility based on message
    }
});