export interface Scheduling {
  uuid: string;
  originAccount: number;
  destinationAccount: number;
  transferAmount: number;
  transferRate: string;
  transferDate: Date;
  schedulingDate: Date;
  status: string;
}

