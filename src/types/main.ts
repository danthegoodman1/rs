import IORedis from 'ioredis'

/**
 * Consumer Options
 */
export interface ConsumerOptions {
  /**
   * IORedis Client
   */
  redisClient: IORedis.Redis
  /**
   * Name of the consumer instance
   */
  consumerName: string
  /**
   * The interval at which to check for abandoned records in milliseconds. If any record is idle for longer than this it will be claimed as an abandoned record
   *
   * default: 1000
   */
  checkAbandonedMS?: number
  /**
   * Consumer group name
   */
  groupName: string
  /**
   * Number of items to pull on each interval
   */
  readItems: number
  /**
   * How long to BLOCK for in milliseconds - default: 0
   */
  blockIntervalMS?: number
  /**
   * Name of the stream
   */
  streamName: string
  /**
   * Function that is called on each stream record in the batch. If the function throws an error, all currently processed items will be acknowledged, and the remaining items will be dropped
   */
  recordHandler: (streamRecord: StreamRecord) => Promise<void>
  /**
   * Function called on the record that threw an error, after all previously processes messages are acknowledged
   */
  errorHandler: (streamRecord: StreamRecord) => Promise<void>
}

/**
 * Record added to stream, formed into { key: value } pairs
 */
export interface StreamRecord {
  /**
   * The ID of the record
   */
  recordID: string
}
