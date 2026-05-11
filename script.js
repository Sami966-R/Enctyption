function encryptText(){

    let text = document.getElementById("inputText").value;
    let algo = document.getElementById("algorithm").value;
    let key = document.getElementById("key").value;

    if(text === ""){
        alert("Enter text");
        return;
    }

    if(algo === ""){
        alert("Select algorithm");
        return;
    }

    let result = "";

    // Caesar Cipher
    if(algo === "caesar"){

        let shift = parseInt(key) || 3;

        result = text.split('').map(char => {
            return String.fromCharCode(char.charCodeAt(0) + shift);
        }).join('');
    }

    // AES
    else if(algo === "aes"){

        if(key === ""){
            alert("Enter AES key");
            return;
        }

        result = CryptoJS.AES.encrypt(text, key).toString();
    }

    // Base64
    else if(algo === "base64"){

        result = btoa(text);
    }

    // SHA256
    else if(algo === "sha256"){

        result = CryptoJS.SHA256(text).toString();
    }

    document.getElementById("outputText").value = result;
}

function decryptText(){

    let text = document.getElementById("inputText").value;
    let algo = document.getElementById("algorithm").value;
    let key = document.getElementById("key").value;

    let result = "";

    // Caesar
    if(algo === "caesar"){

        let shift = parseInt(key) || 3;

        result = text.split('').map(char => {
            return String.fromCharCode(char.charCodeAt(0) - shift);
        }).join('');
    }

    // AES
    else if(algo === "aes"){

        try{
            let bytes = CryptoJS.AES.decrypt(text, key);

            result = bytes.toString(CryptoJS.enc.Utf8);
        }
        catch{
            result = "Invalid key";
        }
    }

    // Base64
    else if(algo === "base64"){

        result = atob(text);
    }

    else{
        result = "SHA-256 cannot be decrypted";
    }

    document.getElementById("outputText").value = result;
}

function copyText(){

    let output = document.getElementById("outputText");

    output.select();

    document.execCommand("copy");

    alert("Copied");
}