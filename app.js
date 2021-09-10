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

        const API_KEY = 'be6b30d5b7c74cfbb8f379507d56e01a';
        let topic = searchInput.value;

        let url =   'https://newsapi.org/v2/everything?' +
                    'q='+ topic +
                    '&sortBy=popularity&' +
                    'apiKey=' + API_KEY;

        let req = new Request(url);

        fetch(req)
            .then(function(res) {
                return res.json();
            }).then(data => {
                data.articles.forEach((article) => {
                    result.innerHTML += `
                    <div class="newsCard">
                        <img src="${article.urlToImage}" style="width: 100%">
                        <li>
                            <h4>
                                <a href="${article.url}" target="_blank">${article.title}</a>
                            </h4>
                            <br>
                            <a>${article.description}</a>
                        </li>
                        <div class="newsBar">
                            <a><strong>Authour: </strong> ${article.author}</a>
                            <a> <strong>Plublish date: </strong> ${article.publishedAt.slice(0, 10)}</a>
                            <a><strong>Source: </strong> ${article.source.name}</a>
                        </div>
                    </div>
                    `;
                })
            })

            
    };

});