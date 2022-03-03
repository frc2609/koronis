import serializerWorker from 'workerize-loader!engine/worker/Serializer'; // eslint-disable-line import/no-webpack-loader-syntax
import positionLogCompressorWorker from 'workerize-loader!engine/worker/PositionLogCompressor'; // eslint-disable-line import/no-webpack-loader-syntax

export const serializerInstance = new serializerWorker();
export const positionLogCompressorInstance = new positionLogCompressorWorker();