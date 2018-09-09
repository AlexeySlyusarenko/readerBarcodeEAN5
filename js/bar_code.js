export default function getBarcodeEAN5FromImage(imgElem) {
    let canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        widthImg = Math.floor(imgElem.getBoundingClientRect().width),
        halfWidthImg = Math.floor(widthImg / 2),
        heightImg = imgElem.getBoundingClientRect().height;
    canvas.width = widthImg;
    canvas.height = heightImg;
    ctx.drawImage(imgElem, 0, 0, widthImg, heightImg);

    let widthAndColorElArr = widthImg > heightImg?
                            getWidthAndColorElArrFromImg(ctx.getImageData(0, Math.floor(heightImg / 2), halfWidthImg, 2).data, halfWidthImg):
                            getWidthAndColorElArrFromImg(ctx.getImageData(0, Math.floor(heightImg / 4), widthImg, 2).data, widthImg);
    return getNumberEAN5FromWidthAndColorElArr(widthAndColorElArr);
}

function getWidthAndColorElArrFromImg(imageData, imageWidth) {
    let widthAndColorElArr = [],
        sum = [],
        el = undefined,
        indexEl = 0,
        min = 0,
        max = 0,
        pivot = 50;

    widthAndColorElArr[0] = [];     // width element array
    widthAndColorElArr[1] = [];     // color (0-white, 1-black) element array

    for(let row = 0; row < 2; row++){
        for(let col = 0; col < imageWidth; col++){
            let i = ((row * imageWidth) + col) * 4,
                g = ((imageData[i] * 3) + (imageData[i + 1] * 4) + (imageData[i + 2] * 2)) / 9,
                s = sum[col];
            imageData[i] = imageData[i + 1] = imageData[i + 2] = g;
            sum[col] = g + (s == undefined ? 0 : s);
        }
    }

    for(let i = 0; i < imageWidth; i++){
        let s = sum[i] = sum[i] / 2;
        if(s < min) min = s;
        if(s > max) max = s;
    }
    pivot = min + ((max - min) / 2);

    sum[0] = sum[0] > pivot ? 0: 1;
    el = sum[0];
    widthAndColorElArr[0][0] = 1
    for (let i = 1; i < sum.length; i++) {
        sum[i] = sum[i] > pivot ? 0: 1;
        if (sum[i] != el) {
            indexEl++;
            el = sum[i];
            widthAndColorElArr[0][indexEl] = 1;
        } else {
            widthAndColorElArr[0][indexEl]++;
        }
    }
    widthAndColorElArr[1] = sum;

    return widthAndColorElArr;
}

function getNumberEAN5FromWidthAndColorElArr(widthAndColorElArr) {
    for(let i = widthAndColorElArr[1][0] == 1? 0: 1; i < widthAndColorElArr[0].length - 30; i = i + 2) {
        if((widthAndColorElArr[0][i] + 2) * 4 >= widthAndColorElArr[0][i + 30] - 2 &&
            (widthAndColorElArr[0][i] + 2) * 4 >= widthAndColorElArr[0][i + 29] - 2 &&
            widthAndColorElArr[0][i] >= widthAndColorElArr[0][i + 1] - 2 &&
            widthAndColorElArr[0][i] <= widthAndColorElArr[0][i + 1] + 2 &&
            widthAndColorElArr[0][i] * 2 >= widthAndColorElArr[0][i + 2] - 2 &&
            widthAndColorElArr[0][i] * 2 <= widthAndColorElArr[0][i + 2] + 2)
        {
                return checkCodeNumberEAN5Arr(widthAndColorElArr[0].slice(i, i + 31));
        }
    }

    return false;
}

function checkCodeNumberEAN5Arr(widthLineEAN5Arr) {
    const LOLIM = 0.4,
        HILIM = 0.6;

    let averageWidthOneLineEAN5 = (widthLineEAN5Arr[0] +
                                widthLineEAN5Arr[1] +
                                widthLineEAN5Arr[7] +
                                widthLineEAN5Arr[8] +
                                widthLineEAN5Arr[13] +
                                widthLineEAN5Arr[14] +
                                widthLineEAN5Arr[19] +
                                widthLineEAN5Arr[20] +
                                widthLineEAN5Arr[25] +
                                widthLineEAN5Arr[26]) / 10,
        modWidthLineEAN5Arr = [],
        indexModWidthLineEAN5Arr = 0,
        indexInaccurateModWidthLineEAN5Arr = [],
        floorModWidthLineEAN5;

    for (let i = 3; i < widthLineEAN5Arr.length; i = i + 6) {
        for (let j = 0; j <= 3; j++) {
            modWidthLineEAN5Arr[indexModWidthLineEAN5Arr] = widthLineEAN5Arr[i + j] / averageWidthOneLineEAN5;
            floorModWidthLineEAN5 = Math.floor(modWidthLineEAN5Arr[indexModWidthLineEAN5Arr]);
    
            if (Math.abs(modWidthLineEAN5Arr[indexModWidthLineEAN5Arr] - floorModWidthLineEAN5) > LOLIM &&
                Math.abs(modWidthLineEAN5Arr[indexModWidthLineEAN5Arr] - floorModWidthLineEAN5) < HILIM ) {
                    indexInaccurateModWidthLineEAN5Arr.push(indexModWidthLineEAN5Arr);
                    modWidthLineEAN5Arr[indexModWidthLineEAN5Arr] = floorModWidthLineEAN5;
            } else {
                    modWidthLineEAN5Arr[indexModWidthLineEAN5Arr] = Math.round(modWidthLineEAN5Arr[indexModWidthLineEAN5Arr]);
            }
            indexModWidthLineEAN5Arr++;
        }
    }
    if (indexInaccurateModWidthLineEAN5Arr.length < 7 &&
        indexInaccurateModWidthLineEAN5Arr.length >= 0) {
            return checkInaccurateWidthLineEAN5Arr(modWidthLineEAN5Arr, indexInaccurateModWidthLineEAN5Arr);
    }

    return false;
}

function checkInaccurateWidthLineEAN5Arr(modWidthLineEAN5Arr, indexInaccurateModWidthLineEAN5Arr) {
    let n = 2 ** indexInaccurateModWidthLineEAN5Arr.length,
        barcodeEAN5Obj = {};

    for (let i = 0; i < n; i++) {
        let iStr = i.toString(2),
            fModWidthLineEAN5Arr = modWidthLineEAN5Arr.slice();
        for (let i = 0; i < indexInaccurateModWidthLineEAN5Arr.length; i++) {
            if (iStr[i] == undefined) iStr = '0' + iStr;
        }
        for (let i = 0; i < indexInaccurateModWidthLineEAN5Arr.length; i++) {
            if (iStr[i] == 1) fModWidthLineEAN5Arr[indexInaccurateModWidthLineEAN5Arr[indexInaccurateModWidthLineEAN5Arr.length - 1 - i]]++;
        }

        barcodeEAN5Obj.widthLineEAN5Arr = fModWidthLineEAN5Arr;
        barcodeEAN5Obj.number = getNumberEAN5(fModWidthLineEAN5Arr);
        
        if (barcodeEAN5Obj.number) return barcodeEAN5Obj;
    }

    return false;
}

function getNumberEAN5(widthLineEAN5Arr) {
    const EAN5L = [3211,
                2221,
                2122,
                1411,
                1132,
                1231,
                1114,
                1312,
                1213,
                3112],
        EAN5G = [1123,
                1222,
                2212,
                1141,
                2311,
                1321,
                4111,
                2131,
                3121,
                2113];
    let numberStr = '',
        checksumStr = '',
        numberTemp = '';
    
    for (let i = 0; i < widthLineEAN5Arr.length; i = i + 4) {
        numberTemp = `${widthLineEAN5Arr[i]}${widthLineEAN5Arr[i + 1]}${widthLineEAN5Arr[i + 2]}${widthLineEAN5Arr[i + 3]}`
        for (let k = 0; k <= 9; k++) {
            if (numberTemp == EAN5L[k]) {
                numberStr = numberStr + k;
                checksumStr = checksumStr + 'L';
                break;
            } else if (numberTemp == EAN5G[k]) {
                numberStr = numberStr + k;
                checksumStr = checksumStr + 'G';
                break;
            }
        }
    }
    if(verifyChecksumEAN5(numberStr, checksumStr)) return numberStr;

    return false;
}

function verifyChecksumEAN5(numberStr, checksumStr) {
    const CHECKSUM = ['GGLLL',
                    'GLGLL',
                    'GLLGL',
                    'GLLLG',
                    'LGGLL',
                    'LLGGL',
                    'LLLGG',
                    'LGLGL',
                    'LGLLG',
                    'LLGLG'];
    let checksumNumber = 0;
    for (let i = 0; i < numberStr.length; i = i + 2) {
        checksumNumber = checksumNumber + Number(numberStr.charAt(i)) * 3; 
    }
    for (let i = 1; i < numberStr.length; i = i + 2) {
        checksumNumber = checksumNumber + Number(numberStr.charAt(i)) * 9; 
    }
    if (CHECKSUM[checksumNumber % 10] == checksumStr) return true;
    
    return false;
}