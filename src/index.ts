import { Spinner } from "./core/spinner.js";
import { DomRenderer } from "./renderer/dom/dom-renderer.js";
import type {
  MountableSpinner,
  SpinnerController,
  SpinnerOptions,
  SpinnerVariant,
} from "./core/types.js";

export type {
  MountableSpinner,
  SpinnerController,
  SpinnerOptions,
  SpinnerVariant,
};

export function createSpinner(
  options: SpinnerOptions = {},
): Spinner {
  return new Spinner(new DomRenderer(), options);
}