// Problems, the problem list and submissions now come from the backend (/api/coding).
// Only the elevation-chart helper stays here.

/** Trapped-water helper for elevation chart visualization */
export function computeTrappedWater(heights) {
  if (!heights || !heights.length) return { trapped: [], total: 0 };
  const n = heights.length;
  const trapped = new Array(n).fill(0);
  let left = 0,
    right = n - 1,
    leftMax = 0,
    rightMax = 0,
    total = 0;

  while (left < right) {
    if (heights[left] < heights[right]) {
      leftMax = Math.max(leftMax, heights[left]);
      const water = leftMax - heights[left];
      trapped[left] = water;
      total += water;
      left++;
    } else {
      rightMax = Math.max(rightMax, heights[right]);
      const water = rightMax - heights[right];
      trapped[right] = water;
      total += water;
      right--;
    }
  }
  return { trapped, total };
}