function getUrl(contentId, callback) {
    var xhr = new XMLHttpRequest();
    var url = 'https://kczx.cuit.edu.cn/learn/v1/course/file/info';
    var params = [];
    params.push(contentId);
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var responseData = JSON.parse(xhr.responseText);
                console.log(responseData.data[0].filePath + "获取成功");
                var result = "https://kczx.cuit.edu.cn" + responseData.data[0].filePath;
                callback(result); // 调用回调函数并传递结果
            } else {
                console.error('Error occurred: ' + xhr.status);
            }
        }
    };
    xhr.send(JSON.stringify(params));
}

// 使用示例
// getUrl(contentId, function (result) {
//     console.log("获取到的字符串为：" + result);
// });

function downloadFile(fileUrl) {
    // 使用正则表达式匹配最后一个斜杠后的内容
    var pattern = /[^/]*$/;
    var result = fileUrl.match(pattern);
    // 提取结果
    var fileName = result[0];

    var xhr = new XMLHttpRequest();
    var url = fileUrl; // 要下载的 URL
    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onload = function () {
        if (xhr.status === 200) {
            var blob = xhr.response;
            var urlCreator = window.URL || window.webkitURL;
            var downloadUrl = urlCreator.createObjectURL(blob);

            var a = document.createElement('a');
            a.href = downloadUrl;
            a.download = fileName; // 下载的文件名
            a.click();
        }
    };

    xhr.send();
}
// treeInfo[0].childInfo[0].info.chapter_describe

const fileDownloadUrl = "";

for (let index = 0; index < treeInfo.length; index++) {
    const childInfo = treeInfo[index].childInfo;
    for (let j = 0; j < childInfo.length; j++) {
        const chapter_describe = childInfo[j].info.chapter_describe;
        console.log(chapter_describe);
        getUrl(chapter_describe, function (result) {
            console.log("获取到的字符串为：" + result);
            fileDownloadUrl = result;
    
            // 下载文件
            downloadFile(fileDownloadUrl);
        });
    }
}


