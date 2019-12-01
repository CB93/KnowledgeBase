const latestPostContainer = document.getElementById("latest-post-container");

renderPosts = async (pagination) => {
    while(latestPostContainer.firstChild)
        latestPostContainer.removeChild(latestPostContainer.firstChild);

    const response = await fetch(`http://localhost:3000/post/${pagination}`, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
    });

    const data = await response.json();

    data.forEach((post) => {
        const discussionCard = document.createElement("div");
        const toggleContainer = document.createElement("div");
        const postInfo = document.createElement("div");
        const textContainer = document.createElement("div");
        const text = document.createElement("p");
        const profilePicContainer = document.createElement("div");
        const subjectContainer = document.createElement("div");
        const topicContainer = document.createElement("div");
        const profilePic = document.createElement("img");
        const subject = document.createElement("h5");
        const topic = document.createElement("h5");
        const date = document.createElement("h6");
        const replies = document.createElement("h6");

        discussionCard.className = "discussion-card card";
        postInfo.className = "row";
        textContainer.className = "row";
        text.className = "discussion-text";
        profilePicContainer.className = "col-sm-3 post-info-item";
        subjectContainer.className = "col-sm-6 post-info-item";
        topicContainer.className = "col-sm-3 post-info-item";
        profilePic.className = "poster-profile-pic";
        subject.className = "discussion-subject";
        topic.className = "discussion-topic";
        toggleContainer.className = "reply-toggle-container"
        date.className = "post-time-stamp";
        replies.className = "discussion-replies";


        discussionCard.append(postInfo);
        discussionCard.append(textContainer);
        discussionCard.append(toggleContainer);
        postInfo.append(profilePicContainer);
        postInfo.append(subjectContainer);
        postInfo.append(topicContainer);
        profilePicContainer.append(profilePic);
        subjectContainer.append(subject);
        topicContainer.append(topic);
        textContainer.append(text);
        toggleContainer.append(date);
        toggleContainer.append(replies);

        profilePic.src = post.imageurl;
        subject.innerText = post.subject;
        topic.innerText = post.topic;
        text.innerText = post.content;
        date.innerText = post.date.split("T")[0];
        replies.innerText = "replies";

        latestPostContainer.append(discussionCard);
    });
}

renderNextPage = async (pagination) => {
    renderPosts(1);
}

renderPreviousPage = async (pagination) => {
    renderPosts(-1);
}

renderPosts(0);
