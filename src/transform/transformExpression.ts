import ts from "typescript";
import { TransformState } from "../class/transformState";
import { transformBinaryExpression } from "./expressions/transformBinaryExpression";
import { transformCallExpression } from "./expressions/transformCallExpression";
import { transformIdentifier } from "./expressions/transformIdentifier";
import { transformNode } from "./transformNode";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TRANSFORMERS = new Map<ts.SyntaxKind, (state: TransformState, node: any) => ts.Expression>([
	[ts.SyntaxKind.CallExpression, transformCallExpression],
	[ts.SyntaxKind.BinaryExpression, transformBinaryExpression],
	[ts.SyntaxKind.Identifier, transformIdentifier],
]);

export function transformExpression(state: TransformState, expression: ts.Expression): ts.Expression {
	const transformer = TRANSFORMERS.get(expression.kind);
	if (transformer) {
		return transformer(state, expression);
	}
	return ts.visitEachChild(expression, (newNode) => transformNode(state, newNode), state.context);
}
