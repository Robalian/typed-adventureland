declare const buttons: {
  [id: string]: {
    value: any;
    fn: Function;
    place: "top" | "bottom";
  };
};
declare function add_top_button(id: string, text: string, fn: () => unknown): void;
declare function add_bottom_button(id: string, text: string, fn: () => unknown): void;
declare function set_button_value(id: string, text: string): void;
declare function clear_buttons(): void;
