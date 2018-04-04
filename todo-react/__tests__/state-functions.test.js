import * as allActions from '../src/actions/allActions';
import * as listActions from '../src/actions/listActions';

describe('actions', () => {
  it('should create an action and list todos', () => {
    const list = [{id: 1, title: "Beethoven", created_by: "1", created_at: "2018-03-30T20:34:53.126Z", updated_at: "2018-03-30T20:34:59.555Z"}]
    const expectedAction = {
      type: allActions.RECEIVE_LIST,
      list
    }
    expect (listActions.receiveList(list)).toEqual(expectedAction)
  });
});