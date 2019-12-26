import {TrieRootNode, TrieChildNode} from "./nodes";
import {DOWN, UP, SAME} from "./characters";

export const serializeTrie = (root: TrieRootNode): string => {
	type QueueItem = TrieChildNode | typeof UP | undefined;
	/**
	 * A trie might look like this:
	 *
	 *                root
	 *                 |
	 *   +-------+-----+-----+-----------+
	 *   |       |           |           |
	 * com      uk          jp         موقع
	 *          |           |
	 *       +--+--+     +--+--+
	 *       |    |      |     |
	 *      co   gov   静岡   岐阜
	 *
	 * And the textual representation of the trie looks like this:
	 * com|uk>co,gov|jp>静岡,岐阜|موقع
	 */
	let serialized = "";
	const queue: Array<QueueItem> = Array.from(root.children.values());
	let current: QueueItem;

	while ((current = queue.shift()) !== undefined) {
		if (current === UP) {
			serialized += UP;
			continue;
		}
		serialized += current.domain;
		if (current.children.size === 0) {
			if (queue.length > 0 && queue[0] !== UP) {
				serialized += SAME;
			}
			continue;
		}
		serialized += DOWN;

		const newItems: Array<QueueItem> = Array.from(current.children.values());

		if (queue.length > 0) {
			newItems.push(UP);
		}
		queue.unshift(...newItems);
	}

	return serialized;
};