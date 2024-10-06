export interface Callback {
  onSuccess: () => void;
  onError: (error: Error) => void;
}
