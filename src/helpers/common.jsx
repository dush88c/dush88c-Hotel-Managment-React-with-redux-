function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
}


async function base64ToFileImage(imageBase64, filename, mimeType) {
    mimeType = mimeType || (imageBase64.match(/^data:([^;]+);/) || '')[1];
    const res = await fetch(imageBase64);
    const buf = res.arrayBuffer();
    return  new File([buf], filename, { type: mimeType });
}


export const commons = {
    getFormData,
    base64ToFileImage,
};