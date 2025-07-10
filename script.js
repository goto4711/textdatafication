document.addEventListener('DOMContentLoaded', () => {
    const processBtn = document.getElementById('processBtn');
    const doc1 = document.getElementById('doc1');
    const doc2 = document.getElementById('doc2');
    const doc3 = document.getElementById('doc3');
    const stopwordsInput = document.getElementById('stopwords');
    const output = document.getElementById('output');

    function processDocuments() {
        const documents = [doc1.value, doc2.value, doc3.value];
        const stopwords = stopwordsInput.value.toLowerCase().split(',').map(word => word.trim());
        
        const allWords = documents.join(' ').toLowerCase().match(/\b(\w+)\b/g) || [];
        const filteredWords = allWords.filter(word => !stopwords.includes(word));
        const vocabulary = [...new Set(filteredWords)].sort();

        let outputHtml = '<h3>Vocabulary (Dictionary):</h3>';
        outputHtml += `<div class="vocabulary">${vocabulary.join(', ')}</div>`;
        outputHtml += '<h3>Term Frequency Vectors:</h3>';
        outputHtml += '<div class="table-container"><table>';
        outputHtml += '<tr><th>Document</th>';
        vocabulary.forEach(word => {
            outputHtml += `<th>${word}</th>`;
        });
        outputHtml += '</tr>';

        documents.forEach((doc, index) => {
            const words = doc.toLowerCase().match(/\b(\w+)\b/g) || [];
            const docWords = words.filter(word => !stopwords.includes(word));
            const vector = vocabulary.map(vocabWord => {
                return docWords.reduce((count, docWord) => count + (docWord === vocabWord ? 1 : 0), 0);
            });
            outputHtml += `<tr><td>Doc ${index + 1}</td>`;
            vector.forEach(val => {
                outputHtml += `<td class="${val > 0 ? 'positive' : 'zero'}">${val}</td>`;
            });
            outputHtml += '</tr>';
        });

        outputHtml += '</table></div>';
        output.innerHTML = outputHtml;
    }

    processBtn.addEventListener('click', processDocuments);

    // Initial processing on page load
    processDocuments();
});