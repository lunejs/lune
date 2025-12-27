export class StateMachine<State extends string> {
  constructor(private readonly transitions: Record<State, State[]>) {}

  canTransition(from: State, to: State): boolean {
    return this.transitions[from].includes(to);
  }
}
