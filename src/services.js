import axios from "axios";

export const instance = axios.create({
    headers: {
        'Appkey': 'JAkSzosy4X7K2FvPBwut5GN0At8DFuIwdhfs1dvr'
    }
})

export const instanceKream = axios.create({
    headers: {
        'X-Kream-Api-Version': '21',
        'X-Kream-Client-Datetime': '20230728191518+0700',
        'X-Kream-Device-Id': 'web;73522a0f-986b-487e-bd41-cbcddf57bf4d',
        'Appkey': 'JAkSzosy4X7K2FvPBwut5GN0At8DFuIwdhfs1dvr'
        // 'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTA2Mjg3MjYsIm5iZiI6MTY5MDYyODcyNiwianRpIjoiZDY0YzVmMDItMzZkNS00OTJiLTgwMDctZTE0ZmFjNmRhMTM2IiwiZXhwIjoxNjkwNjM1OTI2LCJpZGVudGl0eSI6MjczNzkyLCJmcmVzaCI6dHJ1ZSwidHlwZSI6ImFjY2VzcyIsInVjIjp7InNhZmUiOnRydWV9LCJjc3JmIjoiOGMxODRhOGQtZjZkMy00ZmE1LWIzYmQtNWFkYjJmZjNjODcxIn0.3Z0l78PfaP1GZb5NYnMVGVpJT9oOzRQ-K1oBmkaWYaA'
    }
})

export const instanceKreamWithToken = axios.create({
    headers: {
        'X-Kream-Api-Version': '20',
        'X-Kream-Client-Datetime': '20230728191518+0700',
        'X-Kream-Device-Id': 'web;73522a0f-986b-487e-bd41-cbcddf57bf4d',
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2OTQxODU2MzQsIm5iZiI6MTY5NDE4NTYzNCwianRpIjoiNDNlYThjMTgtYzQwOC00ODNjLWEwNzAtN2JmMzhjZGY5NWUwIiwiZXhwIjoxNjk0MTkyODM0LCJpZGVudGl0eSI6MjQ2MTQ4NywiZnJlc2giOnRydWUsInR5cGUiOiJhY2Nlc3MiLCJ1YyI6eyJzYWZlIjp0cnVlfSwiY3NyZiI6IjFkZjc4ZTllLTZiYjItNGFhMi04YzY1LWU4YmEyMzQzYTk0NyJ9.6-d2ST3a7unsrPl7picp86G2xUNpZ-NHS8hLJjQPxSg'
    }
})



