window.addEventListener('load', () => {

    const submit = document.getElementById('submit');
    const searchInput = document.getElementById('searchInput');
    let result = document.getElementById('result');

    

    submit.addEventListener('click', e => {
        e.preventDefault();

        // Search Input Validation
        if(searchInput.value == ''){
            alert('search topic cannot be empty');
        }else{
            result.innerHTML = '';
            getData();
        }

        

    });


    getData = () => {

        const API_KEY = 'cb8df9c7a0932addba8d881d9014c682';
        let topic = searchInput.value;

        let url =  `https://gnews.io/api/v4/search?q=${topic}&lang=en&token=${API_KEY}`;

        let req = new Request(url);

        fetch(req)
            .then(function(res) {
                return res.json();
            }).then(data => {
                data.articles.forEach((article) => {
                    result.innerHTML += `
                    <div class="newsCard">
                        <img src="${article.image}" style="width: 100%">
                        <li>
                            <h4>
                                <a href="${article.url}" target="_blank">${article.title}</a>
                            </h4>
                            <br>
                            <a>${article.content}</a>
                        </li>
                        <div class="newsBar">
                            <a> <strong>Plublish date: </strong> ${article.publishedAt.slice(0, 10)}</a>
                            <a href="${article.source.url}"><strong>Source: </strong> ${article.source.name}</a>
                        </div>
                    </div>
                    `;
                })
            })

            
    };

});