// quick sort

let nums = [20, 20, 20];

for (let i = 0; i < 10; i++) {
  nums.push(Math.floor(Math.random() * 100));
}

console.log("Current array: ", nums);

// function quickSort(array) {
//   let arr = [...array];

//   if (arr.length < 2) return arr;

//   let pivot = arr[Math.floor(arr.length / 2)];
//   let mid = arr.filter((x) => x === pivot);
//   let left = arr.filter((x) => x < pivot);
//   let right = arr.filter((x) => x > pivot);

//   return [...quickSort(left), ...mid, ...quickSort(right)];
// }

// console.log("quicksort: ", quickSort(nums));

function quickSort(arr) {
  return quickSortHelper(arr, 0, arr.length - 1);
}

function quickSortHelper(arr, left, right) {
  if (arr.length < 2) return arr;

  const index = partition(arr, left, right);

  if (left < index - 1) {
    quickSortHelper(arr, left, index - 1);
  }

  if (right > index) {
    quickSortHelper(arr, index, right);
  }

  return arr;
}

function partition(arr, left, right) {
  const pivot = arr[Math.floor((left + right) / 2)];

  while (left <= right) {
    while (arr[left] < pivot) {
      left++;
    }
    while (arr[right] > pivot) {
      right--;
    }

    if (left <= right) {
      swap(arr, left, right);
      left++;
      right--;
    }
  }
  return left;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

console.log("quick sort", quickSort(nums));
