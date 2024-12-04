// For initialization -> mergeSort function can be used to sort the
// array in an efficient way to display it in the first render
const packageDataList = [] // mergeSort(externalDisorderedArray)

const existingIds = []

window.addEventListener('load', () => {
    document.getElementById('submitBtn').addEventListener('click', (e) => processForm(e))
});

function processForm(e){
    e.preventDefault()

    const nameElm = document.getElementById('name')
    const idElm = document.getElementById('packageId')
    const weightElm = document.getElementById('weight')
    const addressElm = document.getElementById('address')

    const errorList = validateInputs(nameElm, idElm, weightElm, addressElm)

    if(errorList.length > 0){
        showResponse(errorList)
        return
    }
    const trackingCode = generateTrackingCode(idElm.value, weightElm.value)
    if(trackingIdExists(idElm.value)){
        showDuplicatedIDError()
        return
    }
    existingIds.push(idElm.value)
    showResponse([], trackingCode)

    // Considering that all data is ordered because of Merge Sort Algotithm
    // used in the initialization process, we can get a better performance
    // using Binary Search to get the correct index where we should insert the new value 
    binarySearchInput(packageDataList, weightElm.value)
    const indexToInsert = binarySearch(packageDataList, weightElm.value)
    
    const tableBody = document.getElementById('tableBody')
    const refElement = tableBody.children[indexToInsert]

    const rowTag = document.createElement('tr')
    rowTag.innerHTML = `
            <td>${nameElm.value}</td>
            <td>${idElm.value}</td>
            <td>${addressElm.value}</td>
            <td>${weightElm.value}</td>
            <td>${trackingCode}</td>`
    tableBody.insertBefore(rowTag, refElement)
}

// Input Verification 
function validateInputs(nameElm, idElm, weightElm, addressElm){
    const errorList = []

    const nameValidator = new RegExp(/^[A-Za-z ]+$/,'g')
    const idValidator = new RegExp(/^[1-9]\d*$/,'g')
    const addressValidator = new RegExp(/^[1-9]+ [A-Za-z ]+$/,'g')
    const weightValidator = new RegExp(/^(?:0|[1-9]+)(:?.[0-9]+)?$/,'g')
    const isZeroValidator = new RegExp(/^0(:?.[0]+)?$/,'g')

    if(!nameValidator.test(nameElm.value)){
        nameElm.classList.add('inputError')
        errorList.push('Error: Invalid Recipient Name. Only alphabetic characters and spaces are allowed.')
    }else{
        nameElm.classList.remove('inputError')
    }
    if(!idValidator.test(idElm.value)){
        idElm.classList.add('inputError')
        errorList.push('Error: Invalid Package ID. Please enter numeric values only.')
    }else{
        idElm.classList.remove('inputError')
    }
    if(!addressValidator.test(addressElm.value)){
        addressElm.classList.add('inputError')
        errorList.push('Error: Invalid Delivery Address. e.g., 123 Haro Street')
    }else{
        addressElm.classList.remove('inputError')
    }
    if(!weightValidator.test(weightElm.value) || isZeroValidator.test(weightElm.value)){
        weightElm.classList.add('inputError')
        errorList.push('Error: Invalid Weight. Please enter numeric positive values only, up to 0.')
    }else{
        weightElm.classList.remove('inputError')
    }
    return errorList
}

// Show Error or Success Messages
function showResponse(errorList, code=''){
    const resultTitle = document.getElementById('titleResult')
    const resultData = document.getElementById('dataResult')
    resultTitle.innerHTML = ''
    resultData.innerHTML = ''

    if(errorList.length > 0){
        resultTitle.classList.remove('success')
        resultTitle.classList.add('error')
        resultTitle.innerHTML = 'Error Handling:'
        errorList.forEach(error => {
            const pElement = document.createElement('p')
            pElement.style = 'margin: 0;'
            pElement.innerHTML = error
            resultData.appendChild(pElement)
        })
        return
    }

    resultTitle.classList.remove('error')
    resultTitle.classList.add('success')
    resultTitle.innerHTML = 'Successful Input:'
    resultData.innerHTML = `Package added successfully! --- 
    Tracking Code: ${code}`
}

function showDuplicatedIDError(){
    const resultTitle = document.getElementById('titleResult')
    const resultData = document.getElementById('dataResult')
    resultTitle.innerHTML = ''
    resultData.innerHTML = ''

    resultTitle.classList.remove('success')
    resultTitle.classList.add('error')
    resultTitle.innerHTML = 'Error Handling:'
    resultData.innerHTML = `Error: Package ID already exists. This package ID was already registered`
}

// Generate Tracking Code
function generateTrackingCode(packageId, weight) {
    return (packageId << 4 | weight).toString(2);
} 

// Verify duplicity on Tracking Codes
function trackingIdExists(id){
    return existingIds.indexOf(id) != -1
}

// Merge Sort Algorithm
// input:  Disordered Array
// output: Ordered Array
function mergeSort(baseArr){
    // Single value or empty arrays are considered sorted
    if( baseArr.length <= 1){
        return baseArr
    }

    const midIndex = Math.floor(baseArr.length/2)
    const leftArr = baseArr.slice(0,midIndex)
    const rightArr = baseArr.slice(midIndex)

    // Recursivity
    const leftArrSorted = mergeSort(leftArr)
    const rightArrSorted = mergeSort(rightArr)

    return merge(leftArrSorted, rightArrSorted)
}

function merge(leftArr, rightArr){
    const result = []
    let i = 0
    let j = 0

    while( i < leftArr.length && j < rightArr.length ){
        if( leftArr[i] < rightArr[j] ){
            result.push(leftArr[i])
            i++
        }else{
            result.push(rightArr[j])
            j++
        }
    }

    // Add to the end the remaining elements
    return result.concat(leftArr.slice(i)).concat(rightArr.slice(j))
}

// Binary Search Algorithm -> to insert a new value
// input:  Ordered Array, New Value to insert
// output: none. MUTATES the original array to improve performance
// Note: Use toSpliced to return a modified copy (less preformance because of the copy of all data)
function binarySearchInput(baseArr, inputValue){
    const indexToInsert = binarySearch(baseArr, inputValue)
    if(inputValue <= baseArr[indexToInsert]){
        baseArr.splice(indexToInsert, 0, inputValue)
    }else{
        baseArr.splice(indexToInsert+1, 0, inputValue)
    }
}

function binarySearch(baseArr, inputValue){
    let left = 0;
    let right = baseArr.length - 1;

    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (baseArr[mid] === inputValue) {
            return mid;
        }
        if (baseArr[mid] < inputValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return left; // This return when left and right are equals
}