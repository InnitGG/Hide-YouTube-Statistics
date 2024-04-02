const style = document.createElement('style');
style.textContent = `
        .hide-before::before {
            content: none !important;
        }
    `;

document.head.appendChild(style);
function hideShortsLikeAmount(shortsInnerContainer) {
    const likeButtons = shortsInnerContainer.querySelectorAll('ytd-toggle-button-renderer[id="like-button"]');
    likeButtons.forEach(likeButton => {
        let likeButtonLabel = likeButton.querySelector('.yt-spec-button-shape-with-label__label');

        if (likeButtonLabel) {
            likeButtonLabel.textContent = 'Like';
        }
    });
}

function hideShortsCommentAmount(shortsInnerContainer) {
    const commentsButtons = shortsInnerContainer.querySelectorAll('div[id="comments-button"]');
    commentsButtons.forEach(commentButton => {
        let commentButtonLabel = commentButton.querySelector('.yt-spec-button-shape-with-label__label');

        if (commentButtonLabel) {
            commentButtonLabel.textContent = 'Comment';
        }
    });
}

function hideShortsCommentsAmountInSidePanel(shortsInnerContainer) {
    const commentLabels = shortsInnerContainer.querySelectorAll('yt-formatted-string[id="contextual-info"]');
    commentLabels.forEach(commentsLabel => {
        commentsLabel.textContent = ' ';
    });
}

function isShorts() {
    return window.location.href.includes('youtube.com/shorts');
}

document.addEventListener('DOMContentLoaded', function () {
});

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
    // TODO: Rewrite to be reactive.
    if (isShorts()) {
        let shortsInnerContainer = document.getElementById('shorts-inner-container');

        if (shortsInnerContainer) {
            // Hide the like amount in the Shorts like button, replace it with 'Like'.
            hideShortsLikeAmount(shortsInnerContainer);

            // Hide the comment amount in the Shorts comment button, replace it with 'Comment'.
            hideShortsCommentAmount(shortsInnerContainer);

            // Hide the comment amount in the Shorts comment side panel.
            hideShortsCommentsAmountInSidePanel(shortsInnerContainer);
        }
    }

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
                            toggleCommentsVisibility(data.hideComments);
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

                // [Video] Remove the subscriber and video counts in the inner channel header of the main channel page.
                if (node.matches('#contentContainer')) {
                    const channelHandles = node.querySelectorAll('#channel-handle');
                    const subscriberCount = node.querySelector('#subscriber-count');
                    const videosCount = node.querySelector('#videos-count');

                    // The subscriber number is contained in a 'yt-formatted-string' element.
                    // The video number is contained in a 'span' element inside a 'yt-formatted-string' element.
                    // By emptying the latter, we also remove 'span'.

                    // Starting at the stable parent, the chain goes:
                    // '#contentContainer'
                    // => '#channel-container'
                    // => '#channel-header'
                    // => '#channel-header-container'
                    // => '#innear-header-container'
                    // => '#meta'
                    // (1) => 'span'
                    // (1) => 'yt-formatted-string#subscriber-count'
                    // (2) => 'span'
                    // (2) => 'yt-formatted-string#videos-count'

                    if (subscriberCount) {
                        subscriberCount.textContent = '';

                        const subscriberCountSeparator = subscriberCount.nextElementSibling;
                        if (subscriberCountSeparator) {
                            subscriberCountSeparator.textContent = '';
                        }
                    }

                    if (videosCount) {
                        videosCount.textContent = '';
                    }

                    // We also need to remove the space after the channel handle, as it is there
                    // after the subscriber count is removed; therefore it looks weird.
                    channelHandles.forEach(channelHandle => {
                        if (channelHandle.nextSibling) {
                            channelHandle.nextSibling.textContent = '';
                        }
                    })
                }
            }
        });
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
});

function toggleCommentsVisibility(hideComments) {
    const comments = document.querySelectorAll('ytd-comments[id="comments"]');
    comments.forEach(comment => {
        comment.style.display = hideComments ? 'none' : 'block';
    });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideComments !== undefined) {
        toggleCommentsVisibility(request.hideComments); // This function toggles visibility based on message
    }
});