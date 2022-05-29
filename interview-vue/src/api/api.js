import request from "../utils/request";

const getTagListAllUrl = '/tag/list/all';
export function getTagListAll() {
    return request({
        url: getTagListAllUrl,
        method: 'get'
    })
}

const getTagDetailUrl = '/tag';
export function getTagDetail(data) {
    return request({
        url: getTagDetailUrl,
        method: 'get',
        params: data
    })
}

const updateTagUrl = '/tag/update';
export function updateTag(data) {
    return request({
        url: updateTagUrl,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

const addTagUrl = '/tag/add';
export function addTag(data) {
    return request({
        url: addTagUrl,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data
    })
}

const deleteTagUrl = '/tag/delete';
export function deleteTag(data) {
    return request({
        url: deleteTagUrl,
        method: 'get',
        params: data
    })
}