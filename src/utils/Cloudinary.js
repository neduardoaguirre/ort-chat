// import CryptoJS from "crypto-js";

export const cloudinaryUpload = (file, fileName, isChatFile) => {
  return new Promise((resolve) => {
    const apiKey = "744387143225778";
    // const apiSecret = "Mutllt-TufenrFL7BZC3HU5oGsw";
    const cloudName = "dxkoq44ah";
    const timestamp = ((Date.now() / 1000) | 0).toString();
    // const hashString = `timestamp=${timestamp}${apiSecret}`;
    // const signature = CryptoJS.SHA1(hashString).toString();

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

    const data = new FormData();
    data.append("public_id", fileName);
    data.append("upload_preset", "ortchat");
    data.append("file", file);
    data.append("api_key", apiKey);
    data.append("timestamp", timestamp);
    data.append("folder", isChatFile ? "chat" : "profile");
    // data.append("signature", signature);

    const xhr = new XMLHttpRequest();

    xhr.open("POST", uploadUrl);

    xhr.onload = () => {
      const res = JSON.parse(xhr.response);
      resolve(res);
    };
    xhr.onerror = (error) => {
      resolve(null);
    };
    xhr.ontimeout = (error) => {
      resolve(null);
    };

    xhr.send(data);
  });
};
