document.addEventListener('DOMContentLoaded', () => {
    let catPicEle = document.getElementsByClassName('cat-pic')[0];
    let newPicEle =  document.getElementById('new-pic');
    let loaderEle = document.getElementsByClassName('loader')[0];
    let upvoteEle = document.getElementById('upvote');
    let downvoteEle = document.getElementById('downvote');
    let scoreEle = document.getElementsByClassName('score')[0];

    fetchImage();

    newPicEle.addEventListener("click", () => {
        fetchImage();
        loaderEle.innerHTML = "Loading...";
    });

    upvoteEle.addEventListener("click", () => {
        fetch("kitten/upvote", {
            method: "PATCH",
        })
            .then(res => {
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then(data => {
                scoreEle.innerHTML = data.score;
            })
            .catch(err => {
                err.json().then(errorJSON => {
                    alert(errorJSON.message);
                })
            });
    });

    downvoteEle.addEventListener('click', () => {
        fetch("kitten/downvote", {
            method: "PATCH",
        })
            .then(res => {
                if (!res.ok) {
                    throw res;
                }
                return res.json();
            })
            .then(data => {
                scoreEle.innerHTML = data.score;
            })
            .catch(err => {
                err.json().then(errorJSON => {
                    alert(errorJSON.message);
                })
            });
    });




    function fetchImage() {
        fetch("/kitten/image")
        .then(res => {
            if (!res.ok) {
                throw res;
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.src);
            catPicEle.setAttribute('src', data.src);
            catPicEle.setAttribute('height', '512px');
            catPicEle.setAttribute('width', '394px');
            scoreEle.innerHTML = data.score;
            loaderEle.innerHTML = '';
        })
        .catch(err => {
            err.json().then(errorJSON => {
                alert(errorJSON.message);
            })
            loaderEle.innerHTML = '';
        });
    }
});
