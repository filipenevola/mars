DataRow = {
    message: "Right position on axis "
};
var dataProvider = [
    _.extend(DataRow, {oldX: 1, oldY: 4, newX: 1, newY: 1}),
    _.extend(DataRow, {oldX: 2, oldY: 3, newX: 2, newY: 2}),
    _.extend(DataRow, {oldX: 3, oldY: 2, newX: 3, newY: 3}),
    _.extend(DataRow, {oldX: 4, oldY: 1, newX: 4, newY: 4})
];

QUnit.test("rover old position check after update", function (assert) {
    dataProvider.forEach(function (d) {
        var rover = new Rover("R", d.oldX, d.oldY, 'N');
        rover.updatePosition(d.newX, d.newY);
        assert.equal(rover.oldX, d.oldX, d.message + " X = " + rover.oldX + " after update!");
        assert.equal(rover.oldY, d.oldY, d.message + " Y = " + rover.oldY + " after update!");
    });
});