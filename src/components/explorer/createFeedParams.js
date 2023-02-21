export default function createFeedParams(arr, id) {
    var params;
    for (let i = 0; i < arr.length; i++) {
      params = (params || id == arr[i])
    }
    return params;
  }