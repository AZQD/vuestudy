import axios from "axios";
//正常上传
const upload = (url, data, headers = {}) => {
    return new Promise((resolve, reject) => {
        axios({
            url,
            method: "post",
            data,
            headers: {
                ...headers,
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err)
        })
    })
}
// 并发上传池：限制同时上传的分片数量
async function uploadWithLimit(promiseFactories, limit = 3) {
    const results = [];
    const executing = [];
    for (const factory of promiseFactories) {
        const p = factory().then(r => { executing.splice(executing.indexOf(p), 1); return r; });
        results.push(p);
        executing.push(p);
        if (executing.length >= limit) await Promise.race(executing);
    }
    return Promise.all(results);
}

//分片上传
const uploadByPieces = async (url,{ fileName, file }) => {
    console.log(23, fileName);
    // 上传过程中用到的变量
    const chunkSize = 5 * 1024 * 1024; // 5MB一片
    const chunkCount = Math.ceil(file.size / chunkSize); // 总片数
    // 获取当前chunk数据
    const getChunkInfo = (file, index) => {
        let start = index * chunkSize;
        let end = Math.min(file.size, start + chunkSize);
        let chunk = file.slice(start, end);
        return { start, end, chunk };
    };
    // 分片上传接口
    const uploadChunk = (data) => {
        return new Promise((resolve, reject) => {
            axios({
                url,
                method: "post",
                data,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                return resolve(res.data)
            }).catch(err => {
                return reject(err)
            })
        })
    }
    // 针对单个文件进行chunk上传
    const readChunk = (index) => {
        const { chunk } = getChunkInfo(file, index);
        let fetchForm = new FormData();
        fetchForm.append("chunk", chunk);
        fetchForm.append("uuid", Date.now());
        fetchForm.append("index", index);
        fetchForm.append("chunkCount", chunkCount);
        return uploadChunk(fetchForm)
    };
    // 针对每个文件进行chunk处理，使用并发池限制同时上传数量
    const promiseFactories = []
    try {
        for (let index = 0; index < chunkCount; ++index) {
            promiseFactories.push(() => readChunk(index))
        }
        const res = await uploadWithLimit(promiseFactories, 3)
        console.log(34, res);
        return res
    }catch (e) {
        return e
    }
}

export { upload, uploadByPieces }
