let array = [];
let isSorting = false; // Sorting state
let stopSorting = false; // Stop flag

// Generate a random array
function generateArray(size = 30) {
    array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    visualizeArray(array);
}

// Visualize the array as bars
function visualizeArray(arr) {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Clear existing bars

    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    });
}

// Start sorting
async function startSorting() {
    if (isSorting) return; // Prevent multiple starts
    isSorting = true;
    stopSorting = false;

    const algorithm = document.getElementById('algorithm').value;

    if (algorithm === 'Bubble Sort') {
        await bubbleSort(array);
    } else if (algorithm === 'Selection Sort') {
        await selectionSort(array);
    } else if (algorithm === 'Insertion Sort') {
        await insertionSort(array);
    } else if (algorithm === 'Quick Sort') {
        await quickSort(array, 0, array.length - 1);
    } else if (algorithm === 'Merge Sort') {
        await mergeSort(array, 0, array.length - 1);
    }

    isSorting = false;
}

// Stop sorting
function stopSortingProcess() {
    stopSorting = true;
}

// Bubble Sort Algorithm
async function bubbleSort(arr) {
    let bars = document.querySelectorAll('.bar');

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (stopSorting) return;

            bars[j].classList.add('selected');
            bars[j + 1].classList.add('selected');

            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                visualizeArray(arr);
                bars = document.querySelectorAll('.bar'); // Refresh bars
            }

            await new Promise(resolve => setTimeout(resolve, 150));
            bars[j].classList.remove('selected');
            bars[j + 1].classList.remove('selected');
        }
    }
}

// Selection Sort Algorithm
async function selectionSort(arr) {
    let bars = document.querySelectorAll('.bar');

    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (stopSorting) return;

            bars[j].classList.add('selected');
            bars[minIndex].classList.add('selected');

            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }

            await new Promise(resolve => setTimeout(resolve, 150));
            bars[j].classList.remove('selected');
            bars[minIndex].classList.remove('selected');
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            visualizeArray(arr);
            bars = document.querySelectorAll('.bar'); // Refresh bars
        }
    }
}

// Insertion Sort Algorithm
async function insertionSort(arr) {
    let bars = document.querySelectorAll('.bar');

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            if (stopSorting) return;

            arr[j + 1] = arr[j];
            j--;

            visualizeArray(arr);
            bars = document.querySelectorAll('.bar');
            await new Promise(resolve => setTimeout(resolve, 150));
        }
        arr[j + 1] = key;
        visualizeArray(arr);
    }
}

// Quick Sort Algorithm
async function quickSort(arr, low, high) {
    if (low < high && !stopSorting) {
        let pivotIndex = await partition(arr, low, high);
        await quickSort(arr, low, pivotIndex - 1);
        await quickSort(arr, pivotIndex + 1, high);
    }
}

// Partition for Quick Sort
async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    let bars = document.querySelectorAll('.bar');

    for (let j = low; j < high; j++) {
        if (stopSorting) return;

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            visualizeArray(arr);
            bars = document.querySelectorAll('.bar');
            await new Promise(resolve => setTimeout(resolve, 150));
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    visualizeArray(arr);
    return i + 1;
}

// Merge Sort Algorithm
async function mergeSort(arr, left, right) {
    if (left >= right) return;

    let mid = Math.floor((left + right) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}

// Merge for Merge Sort
async function merge(arr, left, mid, right) {
    let bars = document.querySelectorAll('.bar');
    let n1 = mid - left + 1;
    let n2 = right - mid;

    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (stopSorting) return;

        if (leftArr[i] <= rightArr[j]) {
            arr[k++] = leftArr[i++];
        } else {
            arr[k++] = rightArr[j++];
        }
        visualizeArray(arr);
        bars = document.querySelectorAll('.bar');
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    while (i < n1) {
        arr[k++] = leftArr[i++];
        visualizeArray(arr);
        bars = document.querySelectorAll('.bar');
        await new Promise(resolve => setTimeout(resolve, 150));
    }

    while (j < n2) {
        arr[k++] = rightArr[j++];
        visualizeArray(arr);
        bars = document.querySelectorAll('.bar');
        await new Promise(resolve => setTimeout(resolve, 150));
    }
}

// Event Listeners
document.getElementById('startBtn').addEventListener('click', startSorting);
document.getElementById('stopBtn').addEventListener('click', stopSortingProcess);
document.getElementById('resetBtn').addEventListener('click', () => {
    generateArray();
});
// Generate initial array
generateArray();
