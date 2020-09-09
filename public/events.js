document.addEventListener('DOMContentLoaded', () => {
    fetch("/kitten/image")
        .then(res => {
            if (!res.ok) {
                throw Error("Something went wrong");
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            console.log(data.src);
        })
        .catch(err => {
            console.error(err);
        });
});
