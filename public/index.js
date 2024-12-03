
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