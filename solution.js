/**
 * @param {number[]} nums
 * @param {number} indexDiff
 * @param {number} valueDiff
 * @return {boolean}
 */
 //Use a hashmap, map the numbers as keys and array of indices as values. (indices containing each index where val appears)
var containsNearbyAlmostDuplicate = function(nums, indexDiff, valueDiff) {
    let map = new Map();
    for(let i=0;i<nums.length;i++){
        let indies = []
        if(map.has(nums[i])) indies = map.get(nums[i]);
        indies.push(i)
        map.set(nums[i],indies)
    }
    //Sort nums in incrementing order
    nums.sort((a,b)=> a - b)
    
    //Now iterate nums, for each val, check closest values up until valueDiff
    for(let i=0;i<nums.length-1;i++){
        let indies = map.get(nums[i])
        for(let j=i+1;j<nums.length;j++){
            if(Math.abs(nums[i]-nums[j])<=valueDiff){
                //Compare indices of current number with indices of num that is within valueDiff
                let indies2 = map.get(nums[j])
                for(let a=0;a<indies.length;a++){
                    for(let b=0;b<indies2.length;b++){
                        //Make sure we don't compare same value with itself (same index)
                        if(indies[a]===indies2[b]) continue;
                        //Check if index requirement met if so return true
                        if(Math.abs(indies[a]-indies2[b])<=indexDiff) return true;
                    }
                }
            }
            //If out of valueDiff range, break so we can move to next num
            else break;
        }
    }
    return false
};
