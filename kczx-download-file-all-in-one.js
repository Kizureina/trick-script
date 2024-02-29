// treeInfo[0].childInfo[0].info.chapter_describe

function getUrl(contentId) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        var url = 'https://kczx.cuit.edu.cn/learn/v1/course/file/info';
        var params = [contentId];
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var responseData = JSON.parse(xhr.responseText);
                    var result = "https://kczx.cuit.edu.cn" + responseData.data[0].filePath;
                    resolve(result);
                } else {
                    reject('Error occurred: ' + xhr.status);
                }
            }
        };
        xhr.send(JSON.stringify(params));
    });
}

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


// 使用递归实现批量下载
function downloadFiles(fileUrls) {
    if (fileUrls.length === 0) {
        return; // 结束递归
    }

    const fileUrl = fileUrls.shift(); // 取出第一个文件链接
    getUrl(fileUrl)
        .then((result) => {
            console.log("成功获取文件链接：" + result);
            downloadFile(result); // 下载文件
            downloadFiles(fileUrls); // 递归调用，处理下一个文件链接
        })
        .catch((error) => {
            console.error("获取文件链接失败：" + error);
            downloadFiles(fileUrls); // 继续处理下一个文件链接
        });
}

// for (let index = 0; index < treeInfo.length; index++) {
//     const childInfo = treeInfo[index].childInfo;

//     for (let j = 0; j < childInfo.length; j++) {
//         let resourse_type = childInfo[j].info.resourse_type;
//         if (resourse_type == "document") {
//             const chapter_describe = childInfo[j].info.chapter_describe;
//             console.log(chapter_describe);
//             fileDownloadUrls.push(chapter_describe);
//         }

//     }
// }

// downloadFiles(fileDownloadUrls);

const fileDownloadUrls = [];

async function processDownloads() {
    for (let index = 0; index < treeInfo.length; index++) {
        const childInfo = treeInfo[index].childInfo;

        for (let j = 0; j < childInfo.length; j++) {
            let resourse_type = childInfo[j].info.resourse_type;
            if (resourse_type === "document" || resourse_type === "other") {
                const chapter_describe = childInfo[j].info.chapter_describe;
                console.log(chapter_describe);
                try {
                    const result = await getUrl(chapter_describe);
                    console.log("获取到的字符串为：" + result);
                    fileDownloadUrls.push(result);
                } catch (error) {
                    console.error("获取文件链接失败：" + error);
                }
            }
        }
    }

    for (let i = 0; i < fileDownloadUrls.length; i++) {
        try {
            await downloadFile(fileDownloadUrls[i]);
            console.log("文件下载成功");
        } catch (error) {
            console.error("文件下载失败：" + error);
        }
    }
}

processDownloads();

