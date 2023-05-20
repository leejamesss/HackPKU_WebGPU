import * as torch from 'webgpu-torch';

export function cacl() { 

const a = torch.tensor([[1, 2, 3], [4, 5, 6]]);

// Create another tensor
const b = torch.tensor([[7, 8, 9], [10, 11, 12]]);

// Add them
const c = a.add(b);
	return c
 }

