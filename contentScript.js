const style = document.createElement('style');
style.textContent = `
        .hide-before::before {
            content: none !important;
        }
    `;

document.head.appendChild(style);

function hideViewCount() {
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

function hideCommentsCount() {
    const commentsHeader = document.querySelector('.ytd-comments-header-renderer[id="leading-section"]');
    if (commentsHeader) {
        const firstSpan = commentsHeader.querySelector('span');
        firstSpan.textContent = ' ';
    }
}

function hideCommentRepliesCount() {
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

function hideViews() {
    const views = document.getElementById('info-container');
    if (views) {
        views.style.display = 'none';
    }
}

function hideSubscribers() {
    const subscribers = document.querySelectorAll('yt-formatted-string#owner-sub-count');
    subscribers.forEach(span => {
        span.style.display = 'none';
    });
}

function hideCommentLikeAmounts() {
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

function hideLikeButtonAmount() {
    const likeButtonRoot = document.getElementById('top-level-buttons-computed');
    if (likeButtonRoot) {
        const likeButton = likeButtonRoot.querySelector('.yt-spec-button-shape-next__button-text-content');

        if (likeButton) {
            likeButton.remove();
        }
    }
}

function hideEverything() {
    // Hide the view count spans in all videos, below their thumbnails.
    hideViewCount();

    // Hide the views span in the video info section.
    hideViews();

    // Hide the subscribers span in the video info section.
    hideSubscribers();

    // Hide the like amounts in all comments.
    hideCommentLikeAmounts();

    // Hide the comment amount.
    hideCommentsCount();

    // Hide the comment reply amount.
    hideCommentRepliesCount();

    // Hide the like amount in the like button.
    hideLikeButtonAmount();

    if (isShorts()) {
        let shortsInnerContainer = document.getElementById('shorts-inner-container');

        // Hide the like amount in the Shorts like button, replace it with 'Like'.
        hideShortsLikeAmount(shortsInnerContainer);

        // Hide the comment amount in the Shorts comment button, replace it with 'Comment'.
        hideShortsCommentAmount(shortsInnerContainer);

        // Hide the comment amount in the Shorts comment side panel.
        hideShortsCommentsAmountInSidePanel(shortsInnerContainer);
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
    hideEverything();
});

const observer = new MutationObserver(mutations => {
    hideEverything();

    if (isStudio()) {
        mutations.forEach(mutation => {
            if (!mutation.addedNodes) return;

            mutation.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    // Hide the video metrics section in the Studio video snapshot
                    // for any children element of this node.
                    hideVideoMetricsOfChildren(node);

                    // Hide the video metrics section in the Studio video snapshot
                    // for this node itself, if it is a metric.
                    hideVideoMetrics(node);

                    // Hide the collapsable bar in the Studio video snapshot,
                    // which sits below the thumbnail.
                    hideAnalyticsCollapsableBar(node);

                    // Hide the views metric in the Studio 'Channel analytics'
                    // section.
                    hideAnalyticsViews(node);

                    // Hide the latest post statistics in the Studio 'Channel analytics',
                    // under 'Latest post'.
                    hideLatestPostStatistics(node);

                    // Hide the top videos views in the Studio 'Channel analytics',
                    // under 'Top videos', for any children element of this node.
                    hideTopVideosViews(node);

                    // Hide the subscribers trend in the Studio 'Channel analytics',
                    // under 'Subscribers trend' for any children element of this node.
                    hideSubscribersTrendOfChildren(node);

                    // Hide the subscribers trend in the Studio 'Channel analytics',
                    // under 'Current subscribers' for this node itself if it is the trend.
                    hideSubscribersTrend(node);

                    // Round the current subscribers amount in the Studio 'Channel analytics',
                    // under 'Current subscribers'.
                    roundCurrentSubscribersAmount(node);
                }
            });
        });
    }
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

// When the content script loads, check the stored preference and apply it
chrome.storage.sync.get('hideComments', function(data) {
    if (data.hideComments !== undefined) {
        toggleCommentsVisibility(data.hideComments); // Apply the stored preference
    }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.hideComments !== undefined) {
        toggleCommentsVisibility(request.hideComments); // This function toggles visibility based on message
    }
});