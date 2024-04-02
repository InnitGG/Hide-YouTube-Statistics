const style = document.createElement('style');
style.textContent = `
        .hide-before::before {
            content: none !important;
        }
    `;

document.head.appendChild(style);

function hideViewCountsBelowThumbnails() {
    const firstViewCounts = document.querySelectorAll('#metadata-line > .inline-metadata-item');
    firstViewCounts.forEach(span => {
        if (span.textContent.includes('views')) {
            span.style.display = 'none';
            const nextSpan = span.nextElementSibling;
            if (nextSpan && !nextSpan.classList.contains('hide-before')) {
                nextSpan.classList.add('hide-before');
            }
        }
    });

    const secondViewCounts = document.querySelectorAll('#metadata-line > .ytd-grid-video-renderer');
    secondViewCounts.forEach(span => {
        if (span.textContent.includes('views')) {
            span.style.display = 'none';
            const nextSpan = span.nextElementSibling;
            if (nextSpan && !nextSpan.classList.contains('hide-before')) {
                nextSpan.classList.add('hide-before');
            }
        }
    });
}

function hideCommentCountBelowVideo() {
    const commentsHeader = document.querySelector('.ytd-comments-header-renderer[id="leading-section"]');
    if (commentsHeader) {
        const firstSpan = commentsHeader.querySelector('span');
        firstSpan.textContent = ' ';
    }
}

function hideReplyAmountsInComments() {
    const moreReplies = document.querySelectorAll('ytd-button-renderer[id="more-replies"]');
    moreReplies.forEach(element => {
        const buttonLabel = element.querySelector('.yt-core-attributed-string');
        if (buttonLabel) {
            buttonLabel.textContent = 'Show more';
        }
    });

    const lessReplies = document.querySelectorAll('ytd-button-renderer[id="less-replies"]');
    lessReplies.forEach(element => {
        const buttonLabel = element.querySelector('.yt-core-attributed-string');
        if (buttonLabel) {
            buttonLabel.textContent = 'Show less';
        }
    });
}

function hideViewsBelowVideo() {
    const views = document.getElementById('info-container');
    if (views) {
        views.style.display = 'none';
    }
}

function hideSubscribersBelowVideo() {
    const subscribers = document.querySelectorAll('yt-formatted-string#owner-sub-count');
    subscribers.forEach(span => {
        span.style.display = 'none';
    });
}

function hideSubscribersBelowVideoDescriptionBottomHeader() {
    const container = document.querySelector('div[id="header-text"]');
    if (container) {
        const subscriberLabel = container.querySelector('div[id="subtitle"]');
        if (subscriberLabel) {
            subscriberLabel.style.display = 'none';
        }
    }
}

function hideLikeAmountsInComments() {
    const voteCountMiddles = document.querySelectorAll('span[id="vote-count-middle"]');
    voteCountMiddles.forEach(voteCountMiddle => {
        voteCountMiddle.textContent = 'Like';
    });
}

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

function hideStudioSeeCommentsAmount() {
    const viewCommentsButton = document.getElementById('view-comments-button');
    if (viewCommentsButton) {
        const viewCommentsButtonLabel = viewCommentsButton.querySelector('div');

        if (viewCommentsButtonLabel) {
            viewCommentsButtonLabel.textContent = 'See Comments';
        }
    }
}

function hideStudioLatestComments() {
    const latestComments = document.querySelector("ytcd-card[test-id='channel-dashboard-comment-card']");
    if (latestComments) {
        latestComments.style.display = 'none';
    }
}

function isVideo() {
    return window.location.href.includes('youtube.com/watch'); // TODO: Add more checks.
}

function isShorts() {
    return window.location.href.includes('youtube.com/shorts');
}

function isStudio() {
    return window.location.href.includes('studio.youtube.com');
}

function hideVideoMetricsOfChildren(node) {
    const videoMetricsElement = node.querySelector('.video-metrics');
    if (videoMetricsElement) {
        videoMetricsElement.style.display = 'none';
    }
}

function hideVideoMetrics(node) {
    if (node.matches('.video-metrics')) {
        node.style.display = 'none';
    }
}

function hideAnalyticsCollapsableBar(node) {
    if ((node.matches('.collapsable-bar') || node.id === "analytics-section") && node.parentElement.id === 'video-snapshot') {
        node.style.display = 'none';
    }
}

function hideAnalyticsViews(node) {
    if ((node.matches('.metric-row')) && node.parentElement.id === "metrics-table" && node.previousElementSibling === null) {
        node.style.display = 'none';
    }
}

function hideSubscribersTrend(node) {
    if (node.matches(".subscribers-trend")) {
        node.style.display = 'none';
    }
}

function roundCurrentSubscribersAmount(node) {
    const metricValues = node.querySelectorAll(".metric-value-big.style-scope.ytcd-channel-facts-item");
    metricValues.forEach(metricValue => {
        const subscribersTitle = metricValue.parentElement.querySelector(".subscribers-title.style-scope.ytcd-channel-facts-item");
        if (subscribersTitle && subscribersTitle.textContent.includes("Current subscribers")) {
            const subscriberCount = Math.round(parseInt(metricValue.textContent.replace(/,/g, '')) / 100000) * 100000;
            metricValue.textContent = subscriberCount.toLocaleString();
        }
    });
}

function hideSubscribersTrendOfChildren(node) {
    if (node.querySelector(".subscribers-trend")) {
        node.querySelector(".subscribers-trend").style.display = 'none';
    }
}

function hideTopVideosViews(node) {
    const topVideoViewLabels = node.querySelectorAll('a.table-cell.remove-default-style.style-scope.ytcd-channel-facts-item[tabindex="-1"]');
    topVideoViewLabels.forEach(topVideoViewLabel => {
        topVideoViewLabel.text = "⠀⠀⠀⠀";
    });
}

function hideLatestPostStatistics(node) {
    if (node.matches('ytcd-post-stats-item')) {
        node.style.display = 'none';
    }
}

function hideLikeAmountsInVideo() {
    const likeButtonRoot = document.getElementById('top-level-buttons-computed');
    if (likeButtonRoot) {
        const likeButton = likeButtonRoot.querySelector('.yt-spec-button-shape-next__button-text-content');

        if (likeButton) {
            likeButton.remove();
        }
    }
}

function toggleCommentSectionVisibility(hideComments) {
    const comments = document.querySelectorAll('ytd-comments[id="comments"]');
    comments.forEach(comment => {
        comment.style.display = hideComments ? 'none' : 'block';
    });
}

function hideEverything() {
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

    if (isStudio()) {
        // Hide the comment amount in the Studio dashboard's 'See Comments (${amount})' button, replace it with 'See Comments'.
        hideStudioSeeCommentsAmount();

        // Hide the 'Latest comments' section in the Studio dashboard.
        hideStudioLatestComments();
    }
}


document.addEventListener('DOMContentLoaded', function () {
    // Hide everything on page load.
    // hideEverything();
});

// checks whether the element has parent with selector X, on the Y last parents
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
        if (!mutation.addedNodes) return;

        let skipUpdatingChannelInfoHeaderViews = false;

        // Remove the view count in the channel information header below the video.
        if (mutation.target.matches('span[style-target="bold"]')) {
            if (hasParentMatchingSelector(mutation.target, 'yt-formatted-string#info', 1)) {
                if (mutation.target.previousSibling == null) {
                    // The label is contained in a 'span:nth-child(1)' element.
                    // Starting at the stable parent, the chain goes:
                    // 'yt-formatted-string#info'
                    // => 'span:nth-child(1)' & 'span:nth-child(2)'

                    mutation.target.textContent = '';

                    const viewsSeparator = mutation.target.nextSibling;
                    if (viewsSeparator) {
                        viewsSeparator.textContent = '';
                    }

                    // Since we have already removed the view count, we skip updating the channel information header views
                    // a second time, as that affects the other spans and I am not certain why.
                    skipUpdatingChannelInfoHeaderViews = true;
                }
            }
        }

        // Remove the view counts in the video thumbnail.
        if (mutation.target.matches('.inline-metadata-item')) {
            if (mutation.target.previousSibling && mutation.target.previousSibling.nodeType === Node.ELEMENT_NODE && mutation.target.previousSibling.matches('div#separator')) {
                // The label si contained in a 'span' element.
                // The 'separator' precedes this element, and we can more likely than not
                // guess that, given this is a '.inline-metadata-item' preceded by the separator,
                // this must be the views label.
                mutation.target.textContent = '';
            }
        }

        // Remove the subscribers count in the channel information header below the video.
        if (mutation.target.matches("#owner-sub-count")) {
            mutation.target.textContent = ' ';
        }

        // Remove the comment amounts in the video comment section.
        if (mutation.target.matches("ytd-button-renderer")) {
            const buttonLabel = mutation.target.querySelector('.yt-core-attributed-string');

            if (buttonLabel) {
                buttonLabel.textContent = 'Show more';
            }
        }

        // Remove the comment amounts in the video comment section.
        if (mutation.target.matches("ytd-button-renderer")) {
            const buttonLabel = mutation.target.querySelector('.yt-core-attributed-string');

            if (buttonLabel) {
                buttonLabel.textContent = 'Show less';
            }
        }

        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // Remove the comment amounts in the video comment section.
                if (node.matches("ytd-button-renderer")) {
                    const buttonLabel = node.querySelector('.yt-core-attributed-string');

                    if (buttonLabel) {
                        buttonLabel.textContent = 'Show more';
                    }
                }

                // Remove the comment amounts in the video comment section.
                if (node.matches("ytd-button-renderer")) {
                    const buttonLabel = node.querySelector('.yt-core-attributed-string');

                    if (buttonLabel) {
                        buttonLabel.textContent = 'Show less';
                    }
                }

                // Remove the comment like amount in the video comment section.
                if (node.matches("ytd-comment-renderer")) {
                    const voteCountMiddle = node.querySelector('span#vote-count-middle');

                    if (voteCountMiddle) {
                        // The label is contained in a 'span#vote-count-middle'.
                        // This is stable, so we do not need to worry about the tree.
                        voteCountMiddle.textContent = ' ';
                    }
                }

                // Remove the comment amount in the video comment section.
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

                // Remove the view counts in the thumbnails of recommended videos.
                if (node.matches("#metadata")) {
                    const metadataLine = node.querySelector("#metadata-line");

                    if (metadataLine) {
                        const views = metadataLine.querySelector("span:nth-child(3)");
                        const viewsSeparator = metadataLine.querySelector("span:nth-child(4)");

                        // The label is contained in a 'span' element.
                        // The separator is contained in a 'span' element that follows the label.
                        // Starting at the stable parent, the chain goes:
                        // '#metadata'
                        // => '#metadata-line'
                        // => 'span:nth-child(3)' & 'span:nth-child(4)'

                        if (views) {
                            views.textContent = '';
                        }

                        // The views separator must be hidden using CSS, because after removing the views,
                        // the '*' separator is left in there and looks weird.
                        if (viewsSeparator) {
                            viewsSeparator.classList.add('hide-before');
                        }
                    }
                }

                // Remove the view counts in the thumbnails of channel videos (eg. 'Videos' tab, or main channel page).
                if (node.matches("ytd-grid-video-renderer")) {
                    const metadataLine = node.querySelector("#metadata-line");

                    if (metadataLine) {
                        const views = metadataLine.querySelector("span:nth-child(1)");
                        const viewsSeparator = metadataLine.querySelector("span:nth-child(2)");

                        // The label is contained in a 'span' element.
                        // The separator is contained in a 'span' element that follows the label.
                        // Starting at the stable parent, the chain goes:
                        // 'ytd-grid-video-renderer'

                        // => '#metadata-line'
                        // => 'span:nth-child(1)' & 'span:nth-child(2)'

                        if (views) {
                            views.textContent = '';
                        }

                        // The views separator must be hidden using CSS, because after removing the views,
                        // the '*' separator is left in there and looks weird.
                        if (viewsSeparator) {
                            viewsSeparator.classList.add('hide-before');
                        }
                    }
                }

                // Remove the subscriber and video counts in the inner channel header of the main channel page.
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

                // Remove the like amount in the like button.
                if (node.matches('.yt-spec-button-shape-next__button-text-content')) {
                    if (hasParentMatchingSelector(node, 'like-button-view-model', 4)) {
                        // The label is contained in a 'yt-spec-button-shape-next__button-text-content' element.
                        // Starting at the stable parent, the chain goes:
                        // 'like-button-view-model'
                        // => 'toggle-button-view-model'
                        // => 'button-view-model'
                        // => 'button'
                        // => 'div':nth-child(2)
                        node.remove();

                        // We remove the 'div' because updating the 'textContent' is harder and unnecessary.
                    }
                }

                // Remove the subscribers count in the channel information header below the video.
                if (node.matches("#upload-info")) {
                    const ownerSubCount = node.querySelector("#owner-sub-count");
                    if (ownerSubCount) {
                        // The label is contained in a 'yt-formatted-string#owner-sub-count' element.
                        // Starting at the stable parent (for which this callback is fired), the chain goes:
                        // 'div#upload-info'
                        // => 'yt-formatted-string#owner-sub-count'
                        ownerSubCount.textContent = ' ';
                    }
                }

                if (!skipUpdatingChannelInfoHeaderViews) {
                    // Remove the view count in the channel information header below the video.
                    if (node.matches("#info-container")) {
                        const info = node.querySelector("yt-formatted-string#info");
                        if (info) {
                            // The label is contained in a 'span:nth-child(1)' element.
                            // Starting at the stable parent (for which this callback is fired), the chain goes:
                            // 'div#info-container'
                            // => 'yt-formatted-string#info'
                            // => 'span:nth-child(1)' & 'span:nth-child(2)'

                            // We also remove the separator, which is the second 'span'.

                            const views = info.querySelector("span:nth-child(1)");
                            const viewsSeparator = info.querySelector("span:nth-child(2)");

                            if (views) {
                                views.textContent = '';
                            }

                            if (viewsSeparator) {
                                viewsSeparator.textContent = '';
                            }
                        }
                    }
                }

                // Remove the subscribers count in the channel information header below the video description.
                if (node.matches("#header")) {
                    const subscriberLabel = node.querySelector("div#subtitle");
                    if (subscriberLabel) {
                        // The label is contained in a 'div#subtitle' element.
                        // Starting at the stable parent (for which this callback is fired), the chain goes:
                        // 'a#header'
                        // => 'div#header-text'
                        // => 'div#subtitle'
                        subscriberLabel.textContent = ' ';
                    }
                }
            }
        });
    });
    //
    // hideEverything();
    //
    // if (isStudio()) {
    //     mutations.forEach(mutation => {
    //         if (!mutation.addedNodes) return;
    //
    //         mutation.addedNodes.forEach(node => {
    //             if (node.nodeType === Node.ELEMENT_NODE) {
    //                 if (node.matches('yt-spec-touch-feedback-shape__fill')) {
    //                     console.log(node);
    //                     console.log(node.parentElement);
    //                     console.log("========================================================")
    //                 }
    //
    //                 // Hide the video metrics section in the Studio video snapshot
    //                 // for any children element of this node.
    //                 hideVideoMetricsOfChildren(node);
    //
    //                 // Hide the video metrics section in the Studio video snapshot
    //                 // for this node itself, if it is a metric.
    //                 hideVideoMetrics(node);
    //
    //                 // Hide the collapsable bar in the Studio video snapshot,
    //                 // which sits below the thumbnail.
    //                 hideAnalyticsCollapsableBar(node);
    //
    //                 // Hide the views metric in the Studio 'Channel analytics'
    //                 // section.
    //                 hideAnalyticsViews(node);
    //
    //                 // Hide the latest post statistics in the Studio 'Channel analytics',
    //                 // under 'Latest post'.
    //                 hideLatestPostStatistics(node);
    //
    //                 // Hide the top videos views in the Studio 'Channel analytics',
    //                 // under 'Top videos', for any children element of this node.
    //                 hideTopVideosViews(node);
    //
    //                 // Hide the subscribers trend in the Studio 'Channel analytics',
    //                 // under 'Subscribers trend' for any children element of this node.
    //                 hideSubscribersTrendOfChildren(node);
    //
    //                 // Hide the subscribers trend in the Studio 'Channel analytics',
    //                 // under 'Current subscribers' for this node itself if it is the trend.
    //                 hideSubscribersTrend(node);
    //
    //                 // Round the current subscribers amount in the Studio 'Channel analytics',
    //                 // under 'Current subscribers'.
    //                 roundCurrentSubscribersAmount(node);
    //             }
    //         });
    //     });
    // }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeOldValue: true,
});

// Hide the comment section based on the stored preference.
chrome.storage.sync.get('hideComments', function(data) {
    if (data.hideComments !== undefined) {
        toggleCommentSectionVisibility(data.hideComments); // Apply the stored preference
    }
});

// When the comment section visibility preference is changed, update the comment section visibility in real time.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideComments !== undefined) {
        toggleCommentSectionVisibility(request.hideComments);
    }
});