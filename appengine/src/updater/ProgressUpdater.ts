import database from "../database";
import {ITranscript} from "../interfaces";


export class ProgressUpdater {
  private greeting: string;

  constructor(message: string) {
    this.greeting = message;
  }

  public greet(): string {
    return "Hello, " + this.greeting;
  }

  public async findTranscriptIdsEligibleForUpdate(): Promise<string[]> {
    const transcriptIds = []
    const transcripts = await database.findTransciptUpdatedTodayNotDone();
    console.log("Eligable: ", JSON.stringify(transcripts));
    if (transcripts) {
      Object.values(transcripts).map((transcript) => {
        if (this.isTranscriptProcessing(transcript)) {
          if (this.hasTranscriptStoppedProgressing(transcript)) {
            transcriptIds.push(transcript.id);
          }
        }
      })
    }
    return transcriptIds
  }

  public async update(): Promise<string[]> {
    return this.findTranscriptIdsEligibleForUpdate();
  }

  protected hasTranscriptStoppedProgressing(transcript: ITranscript) {
    return false;
  }

  protected isTranscriptProcessing(transcript: ITranscript) {
    return true;
  }
}
