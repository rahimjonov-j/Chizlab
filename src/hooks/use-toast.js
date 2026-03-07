import * as React from "react";

const TOAST_LIMIT = 1;

let count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

const listeners = [];
let memoryState = { toasts: [] };

function dispatch(action) {
  switch (action.type) {
    case "ADD_TOAST": {
      memoryState = {
        ...memoryState,
        toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT),
      };
      break;
    }
    case "UPDATE_TOAST": {
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
      break;
    }
    case "DISMISS_TOAST": {
      memoryState = {
        ...memoryState,
        toasts: memoryState.toasts.map((t) =>
          t.id === action.toastId || action.toastId === undefined
            ? { ...t, open: false }
            : t
        ),
      };
      break;
    }
    case "REMOVE_TOAST": {
      memoryState = {
        ...memoryState,
        toasts:
          action.toastId === undefined
            ? []
            : memoryState.toasts.filter((t) => t.id !== action.toastId),
      };
      break;
    }
    default:
      break;
  }

  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast(props) {
  const id = genId();

  const update = (nextProps) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...nextProps, id },
    });

  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  const duration = Number(props?.duration ?? 1000);
  window.setTimeout(() => {
    dismiss();
    window.setTimeout(() => {
      dispatch({ type: "REMOVE_TOAST", toastId: id });
    }, 200);
  }, duration);

  return {
    id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
