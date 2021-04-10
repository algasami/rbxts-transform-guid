import { v4 as uuidv4 } from "uuid";

const labelMap = new Map<string, string>();
export function getGuidForLabel(label: string): string {
	if (labelMap.has(label)) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return labelMap.get(label)!;
	} else {
		const value = uuidv4(); // TODO: Guid
		labelMap.set(label, value);
		return value;
	}
}
