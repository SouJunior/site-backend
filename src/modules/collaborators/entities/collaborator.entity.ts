import { randomUUID } from 'node:crypto';

interface CollaboratorProps {
  id?: string;
  name: string;
  role: string;
  joinAt?: Date;
  leftAt?: Date;
}

export class Collaborator {
  constructor(private props: CollaboratorProps) {
    this.props.id = this.props.id ?? randomUUID();
    this.props.joinAt = this.props.joinAt ?? new Date();
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get role(): string {
    return this.props.role;
  }

  set role(role: string) {
    this.props.role = role;
  }

  get joinAt(): Date {
    return this.props.joinAt;
  }

  set joinAt(joinAt: Date) {
    this.props.joinAt = joinAt;
  }

  left() {
    this.props.leftAt = new Date();
  }

  get leftAt(): Date {
    return this.props.leftAt;
  }
}
