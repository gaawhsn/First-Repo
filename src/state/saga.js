import listsSaga from './lists/saga';
import tasksSaga from './tasks/saga';

export default function*() {
  yield* listsSaga();
  yield* tasksSaga();
}
